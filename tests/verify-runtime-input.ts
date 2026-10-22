import {verifyBrowser} from '../src/browser-verification';
import {readFileSync,writeFileSync} from 'node:fs';
const input=JSON.parse(readFileSync(process.argv[2],'utf8'));
const result=verifyBrowser(input.context,input.report,true,'',false);
const output={source:'Actual native application context/report; unmodified verifyBrowser function',...result,counts:{passed:result.checks.filter(x=>x.ok===true).length,failed:result.checks.filter(x=>x.ok===false).length,unknown:result.checks.filter(x=>x.ok===null).length,total:result.checks.length}};
writeFileSync(process.argv[3],JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify(output,null,2));
