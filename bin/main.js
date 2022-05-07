let InfrastructureFacadeProcess = require('../obj/test/InfrastructureFacadeProcess').InfrastructureFacadeProcess;

try {
    new InfrastructureFacadeProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
