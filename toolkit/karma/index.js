const { Task } = require('@dotcom-tool-kit/types');
const { spawn } = require('child_process');
const { hookFork, waitOnExit } = require('@dotcom-tool-kit/logger');
const karmaCLIPath = require.resolve('karma/bin/karma')

class KarmaCI extends Task {
	async run() {
		const args = ['start', 'test/karma.conf.js']
		this.logger.info(`running karma ${args.join(' ')}`)
		const child = spawn(karmaCLIPath, args)
		hookFork(this.logger, 'karma', child)
		return waitOnExit('karma', child)
	}
}

class KarmaLocal extends KarmaCI {
	async run() {
		// karma-firefox-launcher no longer works for Firefox versions > 121 on MacOS
		// This is a temporary fix while they release a permanent fix for the issue
		// See https://github.com/karma-runner/karma-firefox-launcher/issues/328
		if (process.platform !== 'darwin') {
			return super.run()
		}

		process.env.FIREFOX_BIN = '/Applications/Firefox.app/Contents/MacOS/firefox' 

		super.run()
	}
}

exports.tasks = [ KarmaCI, KarmaLocal ];

