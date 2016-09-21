const service = require('../routes/services/article');

const articleId = 'ReactCssTransitionGroup';
const title = 'React-Css-Transition-Group';
const subtitle = '实现React中的过渡效果';
const createTime = (new Date(2016, 8, 20) - 0);
const desc = 'ReactCSSTransitionGroup用来控制一个或多个React组件的渐变效果。当然在以前，这个可以自己实现。比如透明度从0到1的渐变，先将节点的透明度初始化为0，然后在setTimeout中将节点透明度设置为1。。。';
const url = '/2016/09/20/' + articleId;
const categories = [{categoryId: 'original', categoryName: '原创'}];
const content = `<p>ReactCSSTransitionGroup用来控制一个或多个React组件的渐变效果。</p>

<p>当然在以前，这个可以自己实现。比如透明度从0到1的渐变，先将节点的透明度初始化为0，然后在setTimeout中将节点透明度设置为1，同时，需要给节点增加css的transition属性。</p>

<p>这个麻烦的过程在React中被ReactCSSTransitionGroup(一下简称RCTG)管理起来。</p>

<p>RCTG为组件的渐变提供了三个时机：appear(出现)、enter(进入)和leave(离开)。</p>

<p>appear在页面加载时触发，在整个React组件生命周期内，只触发一次；enter在有新组建加入时触发；leave当有组件被移除时触发。</p>

<pre class="prettyprint"><code class="language-html hljs "><span class="hljs-tag">&lt;<span class="hljs-title">ReactCSSTransitionGroup
</span>    <span class="hljs-attribute">transitionName</span>=<span class="hljs-value">"example"</span>
    <span class="hljs-attribute">transitionAppear</span>=<span class="hljs-value">{true}</span>
    <span class="hljs-attribute">transitionAppearTimeout</span>=<span class="hljs-value">{500}</span>
    <span class="hljs-attribute">transitionEnterTimeout</span>=<span class="hljs-value">{400}</span>
    <span class="hljs-attribute">transitionLeaveTimeout</span>=<span class="hljs-value">{300}</span>
&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{1}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{2}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{3}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">ReactCSSTransitionGroup</span>&gt;</span></code></pre>

<p>上面代码表示，Component1、Component2、Component3加载时，触发appear（<em>transitionAppear={true}</em>），持续500ms（<em>transitionAppearTimeout={500}</em>）。</p>

<p>所谓触发appear，即先后加载两个样式(类似setTimeout的作用)，<strong>.example-appear</strong>和<strong>.example-appear-active</strong>：</p>

<pre class="prettyprint"><code class="language-css hljs "><span class="hljs-class">.example-appear</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">opacity</span>:<span class="hljs-value"> <span class="hljs-number">0.01</span></span></span>;
<span class="hljs-rule">}</span></span>

<span class="hljs-class">.example-appear</span><span class="hljs-class">.example-appear-active</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">opacity</span>:<span class="hljs-value"> <span class="hljs-number">1</span></span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">transition</span>:<span class="hljs-value"> opacity <span class="hljs-number">500</span>ms ease-in</span></span>;
<span class="hljs-rule">}</span></span></code></pre>

<p>完成一个渐进显示的效果。</p>

<p>如果加入一个新组件Component4：</p>

<pre class="prettyprint"><code class="language-html hljs "><span class="hljs-tag">&lt;<span class="hljs-title">ReactCSSTransitionGroup
</span>    <span class="hljs-attribute">transitionName</span>=<span class="hljs-value">"example"</span>
    <span class="hljs-attribute">transitionAppear</span>=<span class="hljs-value">{true}</span>
    <span class="hljs-attribute">transitionAppearTimeout</span>=<span class="hljs-value">{500}</span>
    <span class="hljs-attribute">transitionEnterTimeout</span>=<span class="hljs-value">{400}</span>
    <span class="hljs-attribute">transitionLeaveTimeout</span>=<span class="hljs-value">{300}</span>
&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{1}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{2}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{3}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{4}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">ReactCSSTransitionGroup</span>&gt;</span></code></pre>

<p>Component4将触发enter（enter效果默认开启），持续400ms（<em>transitionEnterTimeout={400}</em>）：</p>



<pre class="prettyprint"><code class="language-css hljs "><span class="hljs-class">.example-enter</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">transform</span>:<span class="hljs-value"> <span class="hljs-function">translate3d(<span class="hljs-number">100</span>%, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)</span></span></span>;
<span class="hljs-rule">}</span></span>

<span class="hljs-class">.example-enter</span><span class="hljs-class">.page-enter-active</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">transform</span>:<span class="hljs-value"> <span class="hljs-function">translate3d(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)</span></span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">transition</span>:<span class="hljs-value"> transform <span class="hljs-number">500</span>ms ease-in</span></span>;
<span class="hljs-rule">}</span></span></code></pre>

<p>Component4将从右侧飞入，其它组件不动。</p>

<p>之所以其它组件不动，是因为它们的key没有变化。React通过检测key的变化，来决定哪个组件需要重新渲染，哪个不需要，所以key是不能省略的，且不能重复。</p>

<p>如果Component2被删除了：</p>



<pre class="prettyprint"><code class="language-html hljs "><span class="hljs-tag">&lt;<span class="hljs-title">ReactCSSTransitionGroup
</span>    <span class="hljs-attribute">transitionName</span>=<span class="hljs-value">"example"</span>
    <span class="hljs-attribute">transitionAppear</span>=<span class="hljs-value">{true}</span>
    <span class="hljs-attribute">transitionAppearTimeout</span>=<span class="hljs-value">{500}</span>
    <span class="hljs-attribute">transitionEnterTimeout</span>=<span class="hljs-value">{400}</span>
    <span class="hljs-attribute">transitionLeaveTimeout</span>=<span class="hljs-value">{300}</span>
&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{1}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{3}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-title">Component</span> <span class="hljs-attribute">key</span>=<span class="hljs-value">{4}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-title">Component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-title">ReactCSSTransitionGroup</span>&gt;</span></code></pre>

<p>将触发leave（默认leave开启），持续300ms（<em>transitionLeaveTimeout={300}</em>）：</p>



<pre class="prettyprint"><code class="language-css hljs "><span class="hljs-class">.example-leave</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">transform</span>:<span class="hljs-value"> <span class="hljs-function">translate3d(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)</span></span></span>;
<span class="hljs-rule">}</span></span>

<span class="hljs-class">.example-leave</span><span class="hljs-class">.example-leave-active</span> <span class="hljs-rules">{
    <span class="hljs-rule"><span class="hljs-attribute">transform</span>:<span class="hljs-value"> <span class="hljs-function">translate3d(<span class="hljs-number">100</span>%, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)</span></span></span>;
    <span class="hljs-rule"><span class="hljs-attribute">transition</span>:<span class="hljs-value"> transform <span class="hljs-number">300</span>ms ease-in</span></span>;
<span class="hljs-rule">}</span></span></code></pre>

<p>Component2飞出，其它组件不动。</p>

<p><a href="http://huan-ji.github.io/react-transition-animation-demo">Demo展示</a> <br>
<a href="https://github.com/kkiiji/react-transition-animation-demo">代码</a></p>`;

service.remove('React-Page-Transition', (err, res) => {
    console.log(err, res);

    service.post(
        articleId,
        title,
        subtitle,
        createTime,
        desc,
        url,
        categories,
        content,
        (err, res) => {
            console.log(err, res);
        }
    );
});