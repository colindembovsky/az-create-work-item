import * as azdev from "azure-devops-node-api";
import { JsonPatchDocument } from "azure-devops-node-api/interfaces/common/VSSInterfaces";
import { IWorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";

export interface IWorkItemInfo {
  type: string,
  title: string,
  description: string,
  iterationPath: string,
  areaPath: string
}

export async function createWorkItem(token: string, orgName: string, project: string, workItemInfo: IWorkItemInfo): Promise<number> {
  let wiClient = await getWiClient(token, orgName);

  let patchDoc = <JsonPatchDocument>[
    { "op": "add", "path": "/fields/System.Title", "value": workItemInfo.title },
    { "op": "add", "path": "/fields/System.Description", "value": workItemInfo.description },
  ];

  if (workItemInfo.areaPath !== '') {
    (<[any]>patchDoc).push({ "op": "add", "path": "/fields/System.AreaPath", "value": workItemInfo.areaPath });
  };
  if (workItemInfo.iterationPath != '') {
    (<[any]>patchDoc).push({ "op": "add", "path": "/fields/System.IterationPath", "value": workItemInfo.iterationPath });
  };

  let workItem = await wiClient.createWorkItem(null, patchDoc, workItemInfo.type, project);
  if (workItem?.id === undefined) {
    throw new Error("Work item was not created");
  }
  return workItem.id;
}

function getWiClient(token: string, orgName: string) : Promise<IWorkItemTrackingApi> {
  let orgUrl = `https://dev.azure.com/${orgName}`;
  let authHandler = azdev.getPersonalAccessTokenHandler(token);
  let connection = new azdev.WebApi(orgUrl, authHandler);
  return connection.getWorkItemTrackingApi();
}