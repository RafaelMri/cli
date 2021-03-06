const Table = require('cli-table');
const { server, asset } = require('../../config');
const out = require('../../lib/output');

const renderInfo = response => {
  const info = response.records[0];
  const table = new Table();

  table.push(
    { Code: info.asset_code },
    { Type: info.asset_type },
    { 'Total Amount': info.amount },
    { 'Num Accounts': info.num_accounts },
    { 'Flag: Auth Required': info.flags.auth_required },
    { 'Flag: Auth Revocable.': info.flags.auth_revocable },
    { 'TOML Link': info._links.toml.href }
  );

  console.log(table.toString());
};

server
  .assets()
  .forIssuer(asset.getIssuer())
  .forCode(asset.getCode())
  .limit(1)
  .call()
  .then(renderInfo)
  .catch(error => out.error('Error fetching asset information', error));
