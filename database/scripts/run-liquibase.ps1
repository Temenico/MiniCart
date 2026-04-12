param(
    [ValidateSet("update", "status", "history", "validate")]
    [string]$Command = "update"
)

$rootPath = Resolve-Path (Join-Path $PSScriptRoot "..")

docker run --rm `
  --network minicart_default `
  -v "${rootPath}:/liquibase/changelog" `
  liquibase/liquibase:4.29 `
  --defaults-file=/liquibase/changelog/docker/liquibase/liquibase.properties `
  $Command
