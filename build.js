#!/usr/bin/env node
var fs = require('fs');
var manage = require('./manage.js');

var jfile = process.argv[2];

var content = fs.readFileSync(jfile,'utf8');
manage.Build(JSON.parse(content));
