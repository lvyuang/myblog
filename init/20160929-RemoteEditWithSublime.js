const service = require('../routes/services/article');

const articleId = 'remote-edit-with-sublime';
const title = '在 Sublime 中远程编辑';
const subtitle = '方便的远程编辑工具';
const createTime = (new Date(2016, 8, 29) - 0);
const desc = '远程连接到linux环境编辑文件时，由于缺少图形界面，总觉得有些不顺手。。。。';
const url = '/2016/09/29/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}];
const content = `<blockquote>
  <p>原文地址： <br>
  <a href="http://log.liminastudio.com/writing/tutorials/sublime-tunnel-of-love-how-to-edit-remote-files-with-sublime-text-via-an-ssh-tunnel">http://log.liminastudio.com/writing/tutorials/sublime-tunnel-of-love-how-to-edit-remote-files-with-sublime-text-via-an-ssh-tunnel</a></p>
</blockquote>

<p>远程连接到linux环境编辑文件时，由于缺少图形界面，总觉得有些不顺手。</p>

<p>Sublime 中提供了一个插件，叫做 rsub ，可以实现在本地编辑一个远程文件。</p>

<p>rsub 工作时，需要在客户端和服务器之间通信，所以需要两端都进行配置。</p>

<h2 id="客户端配置">客户端配置</h2>

<p>在 Sublime 中，<kbd>Command + Shift + P</kbd>，输入 <strong>install</strong> ，并选择 <strong>Package Control: Install Package</strong> 。</p>

<p>等待下一个提示框出现后，输入 <strong>rsub</strong> ，回车安装。</p>

<p>等待安装完毕，编辑配置文件：</p>

<pre class="prettyprint"><code class="language-bash hljs ">&gt; vim ~/.ssh/config</code></pre>

<p>添加：</p>



<pre class="prettyprint"><code class=" hljs dos">Host your_<span class="hljs-comment">remote_server.com</span>
    <span class="hljs-comment">RemoteForward 52698 127.0.0.1:52698</span></code></pre>



<h2 id="服务器端配置">服务器端配置</h2>

<p>连接到服务器，安装脚本：</p>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; <span class="hljs-built_in">sudo</span> wget -O /usr/local/bin/rsub https://raw.github.com/aurora/rmate/master/rmate</code></pre>

<p>添加执行权限：</p>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; <span class="hljs-built_in">sudo</span> chmod +x /usr/local/bin/rsub</code></pre>

<p>配置结束，保持本地的 Sublime 运行，在服务器端编辑文件：</p>

<pre class="prettyprint"><code class="language-bash hljs ">&gt; rsub ~/file.txt</code></pre>

<p>文件将在本地的 Sublime 中被打开。</p>`;

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