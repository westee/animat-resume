//遇到的问题  
//代码很长后不会自动向下滚动
//把code写道 #code和 style 标签里
function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code');
  // domCode.innerHTML = prefix || ''
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    // domCode.innerHTML = code.substring(0, n);
    //将code的0到前n个字符高亮放到domCode中
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    //将code的0到n个字符写到style标签中
    styleTag.innerHTML = prefix + code.substring(0, n);
    domCode.scrollTop = domCode.scrollHeight; //如果页面过长,就自动下拉,最多10000 
    if (n >= code.length) {
      window.clearInterval(id)
      fn()   //fn && fn.call()
    }
  }, 5);
}

function writeMD(md, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0;
  let id = setInterval(() => {
    n += 1;
    //将code的0到前n个字符高亮放到domCode中
    domPaper.innerHTML = md.substring(0, n);
    domPaper.scrollTop = domPaper.scrollHeight; //如果页面过长,就自动下拉,最多10000 
    if (n >= md.length) {
      window.clearInterval(id)
      fn()       //fn && fn.call()
    }
  }, 5);
}

let result = `
 /*
  *面试官你好,我是XXX
  *我将以动画的形式来介绍我自己

  *只用文字介绍太单调了
  *我就用代码来介绍吧

  *首先准备一些样式
  */
 
  * {
    transition: all 1s;
  }
  html{
    background: cyan;
    font-size: 16px;
  }
  #code{
    padding:16px;
    border: 1px solid lightblue;
  }

  /*  我需要一点代码高亮  */
  .token.property{
    color: #905;
  }
  .token.selector{
    color: #690;
  }
  .token.function{
    color: #dd4a68;
  }
  /*  加点3D效果  */
  #code{
    transform:skew(4deg, 4deg);
  }
  /* 接下来就是自我介绍的时候了 */
  /* 我需要一张白纸 */
  #code{
    position: fixed;
    left: 0;
    width: 50%;
    height: 100%;
  } 
  #paper > .content{
    background: lightblue;   
    height: 100%;
    width: 100%;
  }
  #paper{
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  `
let result2 = `

`
let md = `
# 标题1
`
writeCode('', result, () => {
  createPaper(() => {
    console.log('paper有了')
    writeCode(result, result2, ()=>{
      writeMD(md)
    })
  })
})


function createPaper(fn) {
  let paper = document.createElement('div');
  paper.id = 'paper';
  let content = document.createElement('div');
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()    //fn && fn.call()
}
