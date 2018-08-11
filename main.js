//把code写道 #code和 style 标签里
 
var  result = `
 /*
  *面试官你好,我是某某某
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
  /* 我需要一张纸 */

  #code-wrapper{
    width: 50%; left: 0; position: fixed; 
    height: 100%;
  }
  #paper > .content {
   display: block;
  }
  `

var result2 = `
接下来用Marked.js库将Markdown转换成HTML

`
var md = `
# 自我介绍

  我叫王旭东

# 技能介绍

熟悉 JavaScript CSS jQuery ,懂得ajax json jsonp等.

# 项目介绍

 1. XXX 轮播
 2. XXX 简历
 3. XXX 画板
`

writeCode('', result, () => {

  createPaper(() => {

    writeCode(result, '', ()=>{

      writeMD(md, ()=>{

        writeCode(result, result2, ()=>{

          convertMDtoHTML();
        })
      })
    })
  })
})

function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code');
  let n = 0;
  let id = setInterval(() => {
    n += 1;
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
    domPaper.innerHTML = md.substring(0, n);    //将code的0到前n个字符高亮放到domCode中
    domPaper.scrollTop = domPaper.scrollHeight; //如果页面过长,就自动下拉,最多10000 
    if (n >= md.length) {
      window.clearInterval(id)
      console.log(fn)
      fn && fn()       //fn && fn.call()
    }
  }, 5);
}


function createPaper(fn) {
  let paper = document.createElement('div');
  paper.id = 'paper';
  let content = document.createElement('pre');
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()    //fn && fn.call()
}

function convertMDtoHTML(){
  let div = document.createElement('div');
  div.className = 'markdown-body'
  div.innerHTML = marked(md);
  let mdContainer = document.querySelector('#paper> .content')
  mdContainer.replaceWith(div);
}

//遇到的问题  
//代码很长后不会自动向下滚动


