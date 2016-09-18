const service = require('../routes/services/article');

const articleId = 'NPM-SPEED-UP';
const title = 'NPM提速';
const subtitle = '解决NPM访问慢的问题';
const createTime = (new Date(2016, 8, 13) - 0);
const desc = '解决NPM访问慢的问题';
const url = '/2016/09/12/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}];
const content = `<p>npm的默认源在国外，如果速度过慢可以切换到国内，这里推荐taobao源。</p>

<h4 id="使用taobao源下载">使用taobao源下载</h4>



<pre class="prettyprint"><code class=" hljs avrasm">npm --registry=https://registry<span class="hljs-preprocessor">.npm</span><span class="hljs-preprocessor">.taobao</span><span class="hljs-preprocessor">.org</span> install</code></pre>

<p>使用国内源下载速度大幅提升，但与官方库的同步会有个15分钟的延迟。</p>`;

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