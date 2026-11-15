const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:816,height:1056}, deviceScaleFactor:1.5});
  for (const [l,name] of [['es','Implantes dentales - Guía para pacientes'],['en','Dental implants - Patient guide']]) {
    await p.goto('file://'+__dirname+'/guia-'+l+'.html'); await p.waitForTimeout(800); await p.evaluate(()=>document.fonts.ready);
    await p.pdf({path:__dirname+'/'+name+'.pdf', format:'Letter', printBackground:true, preferCSSPageSize:true});
    const pages=await p.locator('.page').count();
    for (let i=0;i<pages;i++) await p.locator('.page').nth(i).screenshot({path:__dirname+`/prev-${l}-${i+1}.png`});
    // overflow check: content taller than page?
    console.log(l, await p.evaluate(()=>[...document.querySelectorAll('.page')].map(pg=>pg.scrollHeight-pg.clientHeight).join(',')));
  }
  await b.close();
})();
