import * as core from '@actions/core';
import { createWorkItem } from './workItemFunctions';

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

    core.debug(`orgName: ${orgName}`);
    core.debug(`project: ${project}`);
    core.debug(`type: ${type}`);
    core.debug(`title: ${title}`);
    core.debug(`description: ${description}`);
    core.debug(`areaPath: ${areaPath}`);
    core.debug(`iterationPath: ${iterationPath}`);

    let newId = await createWorkItem(token, orgName, project, {
      type: type,
      title: title,
      description: description,
      areaPath: areaPath,
      iterationPath: iterationPath
    });
    console.log(`Create work item [${title}] with id ${newId}`);

    core.setOutput('workItemId', newId);
  } catch (error) {
    core.setFailed((<any>error)?.message);
  }
}

run()
