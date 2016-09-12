const service = require('../routes/services/article');

const articleId = 'NPM-SPEED-UP';
const title = 'NPM提速';
const subtitle = '解决NPM访问慢的问题';
const createTime = Date.now();
const desc = 'HyperLogLog(后称HLL)是一种统计算法，用于统计大规模不重复的事物总数，比如一个网站一天的UV。其实，不用HLL也可以达到同样的目的，思路很简单。。。';
const url = '2016/09/12/' + articleId;
const categories = [{categoryId: 'node', categoryName: 'Node'}];
const content = `<h2 id="npm提速">NPM提速</h2>



<h4 id="使用taobao源下载">使用taobao源下载</h4>



<pre class="prettyprint"><code class=" hljs avrasm">npm --registry=https://registry<span class="hljs-preprocessor">.npm</span><span class="hljs-preprocessor">.taobao</span><span class="hljs-preprocessor">.org</span> install</code></pre>

<p>使用国内的源下载速度大幅提升，但与官方库的同步有个15分钟的延迟。</p>`;

service.remove(articleId, (err, res) => {
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