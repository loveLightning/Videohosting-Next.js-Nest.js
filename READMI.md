<div align="center">
<h1>Videohosting</h1>
</div>

## Commit rules
- Type of commit (package): commit msg
- Example: feat(mobile): add button

## Links
- [Figma](https://www.figma.com/file/gCWOfB8xEO1sK1zjZPzzr0/АПК-Бизон?node-id=0:1)
- [Swagger](https://bizonagro.zeeberg.ru/documentation)

## Install modules in root
yarn

## Build common with command
yarn workspace @bizon/common build

## Start Web
- Build common as described above
- `cd packages/web`
- `yarn dev`

## Start Mobile
- Build common as described above
- `cd packages/mobile`
- `yarn start`
- `yarn android or yarn ios`