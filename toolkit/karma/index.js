const { config, Server } = require('karma');
const { Task } = require('@dotcom-tool-kit/types');
const { ToolKitError } = require('@dotcom-tool-kit/error');
const { spawn } = require('child_process');
const { hookFork, waitOnExit } = require('@dotcom-tool-kit/logger');

class KarmaLocal extends Task {
    async run() {
			const args = ['start', 'test/karma.conf.js']

			this.logger.info(`running karma ${args.join(' ')}`)

			const child = spawn('karma', args)

			hookFork(this.logger, 'mocha', child)

			return waitOnExit('mocha', child)
    }
}

exports.tasks = [ KarmaLocal ];

