import * as azdev from 'azure-devops-node-api';
import * as core from '@actions/core';
import {IWorkItemTrackingApi} from 'azure-devops-node-api/WorkItemTrackingApi';
import {JsonPatchDocument} from 'azure-devops-node-api/interfaces/common/VSSInterfaces';

export interface IWorkItemInfo {
  type: string;
  title: string;
  description: string;
  iterationPath: string;
  areaPath: string;
}

export async function createWorkItem(
  token: string,
  orgName: string,
  project: string,
  workItemInfo: IWorkItemInfo
): Promise<number> {
  core.info('Try get work item client');
  const wiClient = await getWiClient(token, orgName);
  core.info('Got work item client');

  const patchDoc = [
    {op: 'add', path: '/fields/System.Title', value: workItemInfo.title},
    {
      op: 'add',
      path: '/fields/System.Description',
      value: workItemInfo.description
    }
  ] as JsonPatchDocument;

  if (workItemInfo.areaPath !== '') {
    (patchDoc as any[]).push({
      op: 'add',
      path: '/fields/System.AreaPath',
      value: workItemInfo.areaPath
    });
  }
  if (workItemInfo.iterationPath !== '') {
    (patchDoc as any[]).push({
      op: 'add',
      path: '/fields/System.IterationPath',
      value: workItemInfo.iterationPath
    });
  }

  core.info('Calling create work item...');
  const workItem = await wiClient.createWorkItem(
    null,
    patchDoc,
    workItemInfo.type,
    project
  );

  if (workItem?.id === undefined) {
    throw new Error('Work item was not created');
  }

  return workItem.id;
}

async function getWiClient(
  token: string,
  orgName: string
): Promise<IWorkItemTrackingApi> {
  const orgUrl = `https://dev.azure.com/${orgName}`;
  core.info(`Connecting to ${orgUrl}`);
  const authHandler = azdev.getPersonalAccessTokenHandler(token);
  const connection = new azdev.WebApi(orgUrl, authHandler);
  core.info('Connection successful!');
  return connection.getWorkItemTrackingApi();
}
