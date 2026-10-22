/** Local presentation fixture: mock IPC only, no user profiles or system changes. */
import {createRoot} from 'react-dom/client';
import {mockIPC} from '@tauri-apps/api/mocks';
import {MotionRoot,TooltipProvider,Panel} from 'cromma-ui';
import {useState} from 'react';
import {LanguageSwitch} from '../src/language-switch';
import {HelpPanel} from '../src/help';
import {SystemPanel} from '../src/system';
import {useI18n} from '../src/i18n';
import '../src/index.css';
import '../src/style.css';
mockIPC((command,args)=>{
 if(command==='ui_language_read')return localStorage.getItem('fixture-language')||'vi';
 if(command==='ui_language_write'){localStorage.setItem('fixture-language',String(args?.language));return;}
 if(command==='system_read')return {platform:'linux',timezone:'Asia/Ho_Chi_Minh',timezones:['Asia/Ho_Chi_Minh','Asia/Bangkok'],automatic_timezone:false,languages:['vi-VN'],location_enabled:null,accessibility:false};
 throw Error(`Read-only localization fixture refuses ${command}`);
});
function Fixture(){
 const {t}=useI18n();const [page,setPage]=useState('help');
 return <div className="app-shell"><aside className="app-sidebar"><strong>CCBaga-A · UI test</strong><nav><button onClick={()=>setPage('help')}>{t('使用说明')}</button><button onClick={()=>setPage('system')}>{t('电脑环境')}</button></nav><div className="sidebar-bottom"><LanguageSwitch/></div></aside><Panel frame className="workspace"><div className="cleaner-slot">{page==='help'?<HelpPanel/>:<SystemPanel/>}</div></Panel></div>;
}
createRoot(document.getElementById('fixture')!).render(<MotionRoot><TooltipProvider><Fixture/></TooltipProvider></MotionRoot>);
