import { danger, fail, message, warn } from 'danger';

const stagingRun = (process.argv.includes('-s'));

const fileMatches = danger.git.fileMatch('*.md');

if (stagingRun) {
	console.log('stagingRun');
	
	console.log('fileMatches.getKeyedPaths():', JSON.stringify(fileMatches.getKeyedPaths(), null, 4));
	danger.git.structuredDiffForFile('one.md').then(diff => {
		console.log('structuredDiffForFile(one.md):', JSON.stringify(diff, null, 4));
	});
	danger.git.structuredDiffForFile('two.md').then(diff => {
		console.log('structuredDiffForFile(two.md):', JSON.stringify(diff, null, 4));
	});
	danger.git.structuredDiffForFile('three.md').then(diff => {
		console.log('structuredDiffForFile(three.md):', JSON.stringify(diff, null, 4));
	});
	
	Promise.all([danger.git.structuredDiffForFile('one.md'), danger.git.structuredDiffForFile('two.md'), danger.git.structuredDiffForFile('three.md')]).then(() => {
		console.log(
			fileMatches.getKeyedPaths().edited.includes('two.md'), // true
			fileMatches.getKeyedPaths().edited.length === 1, // false, expected true
		);
		danger.git.structuredDiffForFile('one.md').then(diff => {
			console.log(
				'one.md',
				diff === null, // false, expected true
				JSON.stringify(diff).includes('one') === false, // false, expected true
				JSON.stringify(diff).includes('uno') === false, // false, expected true
			);
		});
		danger.git.structuredDiffForFile('two.md').then(diff => {
			console.log(
				'two.md',
				diff !== null, // false, expected true
				JSON.stringify(diff).includes('two'), // false, expected true
				JSON.stringify(diff).includes('dos'), // false, expected true
			);
		});
		danger.git.structuredDiffForFile('three.md').then(diff => {
			console.log(
				'three.md',
				diff === null, // true
				JSON.stringify(diff).includes('three') === false, // true
				JSON.stringify(diff).includes('tres') === false, // true
			);
		});
	});
}
else {
	console.log('committedRun');
	
	console.log('fileMatches.getKeyedPaths():', JSON.stringify(fileMatches.getKeyedPaths(), null, 4));
	danger.git.structuredDiffForFile('one.md').then(diff => {
		console.log('structuredDiffForFile(one.md):', JSON.stringify(diff, null, 4));
	});
	danger.git.structuredDiffForFile('two.md').then(diff => {
		console.log('structuredDiffForFile(two.md):', JSON.stringify(diff, null, 4));
	});
	danger.git.structuredDiffForFile('three.md').then(diff => {
		console.log('structuredDiffForFile(three.md):', JSON.stringify(diff, null, 4));
	});
	
	Promise.all([danger.git.structuredDiffForFile('one.md'), danger.git.structuredDiffForFile('two.md'), danger.git.structuredDiffForFile('three.md')]).then(() => {
		console.log(
			fileMatches.getKeyedPaths().edited.includes('one.md'), // true
			fileMatches.getKeyedPaths().edited.length === 1, // true
		);
		danger.git.structuredDiffForFile('one.md').then(diff => {
			console.log(
				'one.md',
				diff !== null, // true
				JSON.stringify(diff).includes('one'), // true
				JSON.stringify(diff).includes('uno'), // true
			);
		});
		danger.git.structuredDiffForFile('two.md').then(diff => {
			console.log(
				'two.md',
				diff === null, // true
				JSON.stringify(diff).includes('two') === false, // true
				JSON.stringify(diff).includes('dos') === false, // true
			);
		});
		danger.git.structuredDiffForFile('three.md').then(diff => {
			console.log(
				'three.md',
				diff === null, // true
				JSON.stringify(diff).includes('three') === false, // true
				JSON.stringify(diff).includes('tres') === false, // true
			);
		});
	});
}
