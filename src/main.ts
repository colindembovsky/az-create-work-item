import * as core from '@actions/core';
import {createWorkItem} from './work-item-functions';

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token');
    const orgName: string = core.getInput('orgName');
    const project: string = core.getInput('project');
    const type: string = core.getInput('type');
    const title: string = core.getInput('title');
    const description: string = core.getInput('description');
    const areaPath: string = core.getInput('areaPath');
    const iterationPath: string = core.getInput('iterationPath');

    core.info(`orgName: ${orgName}`);
    core.info(`project: ${project}`);
    core.info(`type: ${type}`);
    core.info(`title: ${title}`);
    core.info(`description: ${description}`);
    core.info(`areaPath: ${areaPath}`);
    core.info(`iterationPath: ${iterationPath}`);

    core.info('Creating new work item...');
    const newId = await createWorkItem(token, orgName, project, {
      type,
      title,
      description,
      areaPath,
      iterationPath
    });
    core.info(`Created work item [${title}] with id ${newId}`);

    core.setOutput('workItemId', newId);
  } catch (error) {
    core.setFailed((error as any)?.message);
  }
}

run();
