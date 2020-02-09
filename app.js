const utils = require('./utils');
const yargs = require('yargs');

yargs.command({
    command: 'newCrew',
    describe: 'Create new crew',
    handler: (argv) => {
        utils.createCrew()
    }
})

yargs.command({
    command: 'listCrew',
    describe: 'List crews by params',
    builder: {
        empty: {
            describe: 'List crews that need staff'
        },
        free: {
            describe: 'List all crews that have less than 3 calls'
        }
    },
    handler: (argv) => {
        if (argv.empty && argv.free) console.log('You can choose only one param!')
        utils.listCrew(argv.free, argv.empty)
    }
})

yargs.command({
    command: 'setDriver',
    describe: 'Set driver of the crew',
    builder: {
        crewID: {
            describe: 'Input crew ID',
            demandOption: true,
            type: 'string'
        },
        staffID: {
            describe: 'Input staff ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.setDriver(argv.crewID, argv.staffID)
    }
})

yargs.command({
    command: 'setStaff',
    describe: 'Set staff of the crew',
    builder: {
        crewID: {
            describe: 'Input crew ID',
            demandOption: true,
            type: 'string'
        },
        staffID: {
            describe: 'Input staff ID',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.setStaff(argv.crewID, argv.staffID)
    }
})

yargs.command({
    command: 'createStaff',
    describe: 'Crete new person - staff',
    builder: {
        name: {
            describe: 'Input name of person',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.createStaff(argv.name)
    }
})

yargs.command({
    command: 'listStaff',
    describe: 'List all staff',
    handler: (argv) => {
        utils.listStaff()
    }
})

yargs.command({
    command: 'freeStaff',
    describe: 'Free some staff from some crew',
    builder: {
        staffID: {
            describe: 'Input id of staff',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.freeStaff(argv.staffID)
    }
})

yargs.command({
    command: 'createCall',
    describe: 'Create new call',
    builder: {
        crewID: {
            describe: 'Input crew ID',
            demandOption: true,
            type: 'string' 
        },
        description: {
            describe: 'Describe situation',
            demandOption: true,
            type: 'string'
        },
        address: {
            describe: 'Input address',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.createCall(argv.crewID, argv.description, argv.address)
    }
})

yargs.command({
    command: 'listCalls',
    describe: 'List calls by crew ID',
    builder: {
        crewID: {
            describe: 'Input crew ID',
            demandOption: true,
            type: 'string' 
        }
    },
    handler: (argv) => {
        utils.listCalls(argv.crewID)
    }
})

yargs.command({
    command: 'callDone',
    describe: 'End some call',
    builder: {
        callID: {
            describe: 'Input ID of call',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.callDone(argv.callID)
    }
})

yargs.parse();



