# az-create-work-item

<p align="left">
  <a href="https://github.com/colindembovsky/az-create-work-item/actions/workflows/test.yml/badge.svg"><img alt="Build and Test" src="https://github.com/colindembovsky/az-create-work-item/actions/workflows/test.yml/badge.svg"></a> 
</p>

# Usage

See [action.yml](action.yml)

**Basic:**
```yaml
steps:
- uses: colindembovsky/az-create-work-item@v1.0.0
  with:
    token: ${{ secrets.AZDO_TOKEN }}
    orgName: myorg
    project: myproject
    type: User Story
    title: Work item from run ${{ github.run_number }}
    description: Created from Actions!
    # optional inputs
    #iterationPath: 'myproject\Iteration 1'
    #areaPath: 'myproject\Area51'
```

### Token
This Action uses the Azure DevOps REST API to create the work item. Authentication is performed via Personal Access Token (PAT).

We recommend storing the PAT as a secret in the repo.

> Note: The only permission that the PAT requires is `Work Item (Read and Write)`. In general, generate least-privelege tokens!

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)