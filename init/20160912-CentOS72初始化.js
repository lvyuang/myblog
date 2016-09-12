const service = require('../routes/services/article');

const articleId = 'CentOS72-Init';
const title = 'CentOS 7.2 初始化';
const subtitle = '系统环境配置记录';
const createTime = Date.now();
const desc = '记录服务器初始化过程，步骤繁琐，便于查询。。。';
const url = '2016/09/12/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}, {categoryId: 'centos', categoryName: 'CentOS'}];
const content = `<h4 id="安装git">安装git</h4>



<pre class="prettyprint"><code class=" hljs cmake">yum <span class="hljs-keyword">install</span> -y git</code></pre>



<h4 id="安装vim">安装vim</h4>



<pre class="prettyprint"><code class=" hljs cmake">yum <span class="hljs-keyword">install</span> -y vim</code></pre>



<h4 id="安装zsh">安装zsh</h4>



<pre class="prettyprint"><code class=" hljs vala">yum install -y zsh

<span class="hljs-preprocessor"># 切换到zsh</span>
chsh -s $(which zsh)

<span class="hljs-preprocessor"># 重新登录</span>
logout</code></pre>



<h4 id="安装oh-my-zsh">安装oh-my-zsh</h4>



<pre class="prettyprint"><code class=" hljs bash">sh -c <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)</span>"</span></code></pre>



<h4 id="切换zsh皮肤">切换zsh皮肤</h4>



<pre class="prettyprint"><code class=" hljs avrasm">vim ~/<span class="hljs-preprocessor">.zshrc</span></code></pre>



<pre class="prettyprint"><code class=" hljs vala"><span class="hljs-preprocessor"># 修改字段</span>
ZSH_THEME=<span class="hljs-string">"ys"</span></code></pre>



<pre class="prettyprint"><code class=" hljs vala"><span class="hljs-preprocessor"># 重新登录</span>
logout</code></pre>



<h4 id="添加用户和默认组wheel">添加用户和默认组(wheel)</h4>



<pre class="prettyprint"><code class=" hljs lasso">useradd lvyuang <span class="hljs-attribute">-g</span> wheel</code></pre>



<h4 id="设置用户密码">设置用户密码</h4>



<pre class="prettyprint"><code class=" hljs ">passwd lvyuang</code></pre>



<h4 id="设置免密码ssh登录">设置免密码ssh登录</h4>



<pre class="prettyprint"><code class=" hljs avrasm"><span class="hljs-preprocessor"># 创建~/.ssh目录</span>
mkdir ~/<span class="hljs-preprocessor">.ssh</span>

<span class="hljs-preprocessor"># 将公钥复制到远程</span>
scp id_rsa<span class="hljs-preprocessor">.pub</span> root@[your_ip]:/home/lvyuang/<span class="hljs-preprocessor">.ssh</span>/authorized_keys

<span class="hljs-preprocessor"># 设置权限</span>
chmod <span class="hljs-number">700</span> ~/<span class="hljs-preprocessor">.ssh</span>
chown lvyuang:wheel ~/<span class="hljs-preprocessor">.ssh</span>/authorized_keys
chmod <span class="hljs-number">600</span> ~/<span class="hljs-preprocessor">.ssh</span>/authorized_keys</code></pre>



<h4 id="设置免密码sudo">设置免密码sudo</h4>



<pre class="prettyprint"><code class=" hljs ">vim /etc/sudoers</code></pre>



<pre class="prettyprint"><code class=" hljs vala"><span class="hljs-preprocessor"># 修改字段</span>
<span class="hljs-preprocessor">#wheel ALL=(ALL) NOPASSWD: ALL</span></code></pre>



<h4 id="显示vim行号">显示vim行号</h4>



<pre class="prettyprint"><code class=" hljs ">vim /etc/vimrc</code></pre>



<pre class="prettyprint"><code class=" hljs vala"><span class="hljs-preprocessor"># 添加</span>
<span class="hljs-keyword">set</span> number</code></pre>



<h4 id="安装node环境">安装node环境</h4>



<pre class="prettyprint"><code class=" hljs vala"><span class="hljs-preprocessor"># 安装nvm</span>
curl -o- https:<span class="hljs-comment">//raw.githubusercontent.com/creationix/nvm/v0.31.7/install.sh | bash</span>

<span class="hljs-preprocessor"># 安装node</span>
nvm install v6<span class="hljs-number">.5</span><span class="hljs-number">.0</span></code></pre>



<h4 id="安装redis">安装redis</h4>



<pre class="prettyprint"><code class=" hljs avrasm">wget http://download<span class="hljs-preprocessor">.redis</span><span class="hljs-preprocessor">.io</span>/releases/redis-<span class="hljs-number">3.2</span><span class="hljs-number">.3</span><span class="hljs-preprocessor">.tar</span><span class="hljs-preprocessor">.gz</span>
--<span class="hljs-number">2016</span>-<span class="hljs-number">09</span>-<span class="hljs-number">12</span> <span class="hljs-number">22</span>:<span class="hljs-number">54</span>:<span class="hljs-number">14</span>--  http://download<span class="hljs-preprocessor">.redis</span><span class="hljs-preprocessor">.io</span>/releases/redis-<span class="hljs-number">3.2</span><span class="hljs-number">.3</span><span class="hljs-preprocessor">.tar</span><span class="hljs-preprocessor">.gz</span>

tar xzf redis-<span class="hljs-number">3.2</span><span class="hljs-number">.3</span><span class="hljs-preprocessor">.tar</span><span class="hljs-preprocessor">.gz</span>

<span class="hljs-preprocessor"># 安装gcc</span>
yum install -<span class="hljs-built_in">y</span> gcc

<span class="hljs-preprocessor"># macos中，不需要加MALLOC参数</span>
make MALLOC=libc

<span class="hljs-preprocessor"># 安装tcl</span>
yum install -<span class="hljs-built_in">y</span> tcl

<span class="hljs-preprocessor"># 运行测试脚本</span>
make test

<span class="hljs-preprocessor"># 安装(切换到root)</span>
make install

<span class="hljs-preprocessor"># 生成配置文件</span>
cd utils
./install_server<span class="hljs-preprocessor">.sh</span>

<span class="hljs-preprocessor"># 进入redis命令行</span>
<span class="hljs-preprocessor"># (进入redis-cli后运行shutdown，可以关闭服务)</span>
redis-<span class="hljs-keyword">cli</span>

<span class="hljs-preprocessor"># 启动redis server</span>
redis-server</code></pre>`;

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