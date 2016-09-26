const service = require('../routes/services/article');

const articleId = 'Weinre';
const title = '远程调试工具Weinre';
const subtitle = '不用连接线、不挑浏览器的远程调试工具';
const createTime = (new Date(2016, 8, 26) - 0);
const desc = 'Weinre可以在桌面端远程调试手机上的Web页面，同样使用webkit内核提供的developer tools，相比于其它的远程调试工具，Weinre最大的优势是不受可以客户端浏览器的限制，在微信里也可以调试。。。';
const url = '/2016/09/26/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}];
const content = `<p>Weinre(读作winery)可以在桌面端远程调试手机上的Web页面，同样使用webkit内核提供的developer tools，相比于其它的远程调试工具，Weinre最大的优势是不受客户端浏览器的限制，在微信里也可以调试。</p>

<h2 id="安装">安装</h2>

<p>Weinre需要node环境的支持，通过npm安装到全局路径。</p>

<pre class="prettyprint"><code class="language-bash hljs ">npm i -g weinre</code></pre>

<p>查看帮助文档</p>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; weinre --help

usage:   weinre [options]
version: <span class="hljs-number">2.0</span>.<span class="hljs-number">0</span>-pre-I0Z7U9OV

options:
    --httpPort     port to run the http server on        default: <span class="hljs-number">8080</span>
    --boundHost    ip address to <span class="hljs-built_in">bind</span> the server to      default: localhost
    --verbose      print more diagnostics                default: <span class="hljs-literal">false</span>
    --debug        print even more diagnostics           default: <span class="hljs-literal">false</span>
    --readTimeout  seconds to wait <span class="hljs-keyword">for</span> a client message  default: <span class="hljs-number">5</span>
    --deathTimeout seconds to wait to kill client        default: <span class="hljs-number">3</span>*<span class="hljs-built_in">read</span>Timeout

--boundHost can be an ip address, hostname, or -all-, where -all-
means binding to all ip address on the current machine<span class="hljs-string">'

for more info see: http://people.apache.org/~pmuellr/weinre/</span></code></pre>



<h2 id="启动server">启动Server</h2>

<p>默认是只允许localhost访问，由于要支持手机访问，需要将ip的限制取消。</p>

<pre class="prettyprint"><code class="language-bash hljs ">&gt; weinre --boundHost -all-

<span class="hljs-number">2016</span>-<span class="hljs-number">09</span>-<span class="hljs-number">26</span>T03:<span class="hljs-number">35</span>:<span class="hljs-number">46.103</span>Z weinre: starting server at http://localhost:<span class="hljs-number">8080</span></code></pre>

<p>在浏览器中访问地址：<a href="http://localhost:8080">http://localhost:8080</a></p>

<p><img src="/resources/article/20160926-Weinre/1.webp" alt="" title=""></p>

<p>点击第一个链接 <a href="http://localhost:8080/client/#anonymous">http://localhost:8080/client/#anonymous</a>，跳转到：</p>

<p><img src="/resources/article/20160926-Weinre/2.webp" alt="" title=""></p>



<h2 id="调试">调试</h2>

<p>Weinre通过XMLHttpRequest对象在客户端和服务端之间传送数据。如果你的页面需要调试，在页面底部加入脚本：</p>



<pre class="prettyprint"><code class=" hljs asciidoc">&lt;script src="<span class="hljs-link_url">http://</span>[<span class="hljs-link_label">YOUR_HOST_IP</span>]:8080/target/target-script-min.js#anonymous"&gt;</code></pre>

<p>将[YOUR_HOST_IP]替换成Web Server的IP。</p>

<p>再通过手机去访问调试页面，server端可以看到client已连接。</p>

<p><img src="/resources/article/20160926-Weinre/3.webp" alt="" title=""></p>

<p>点击client链接，表示选中了需要调试的client。</p>

<p>后面的几个标签就不用，就是chrome的开发者工具，现在可以调试了，比如在控制台中弹个对话框：</p>

<p><img src="/resources/article/20160926-Weinre/4.webp" alt="" title=""></p>

<p>可以在手机中看到：</p>

<p><img src="/resources/article/20160926-Weinre/5.webp" alt="" title=""></p>

<p>更详细的文档请访问<a href="https://people.apache.org/~pmuellr/weinre/docs/latest/">官方网站</a>。</p>`;

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