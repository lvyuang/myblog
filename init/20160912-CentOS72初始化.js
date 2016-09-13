const service = require('../routes/services/article');

const articleId = 'CentOS72-Init';
const title = 'CentOS 7.2 初始化';
const subtitle = '系统环境配置记录';
const createTime = (new Date(2016, 8, 12) - 0);
const desc = '记录服务器初始化过程，步骤繁琐，便于查询。。。';
const url = '2016/09/12/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}, {categoryId: 'centos', categoryName: 'CentOS'}];
const content = `<h4 id="安装git">安装git</h4>



<pre class="prettyprint"><code class="language-bash hljs ">yum install -y git</code></pre>

<h4 id="安装vim">安装vim</h4>



<pre class="prettyprint"><code class="language-bash hljs ">yum install -y vim</code></pre>

<h4 id="安装zsh">安装zsh</h4>



<pre class="prettyprint"><code class="language-bash hljs ">yum install -y zsh

<span class="hljs-comment"># 切换到zsh</span>
chsh <span class="hljs-operator">-s</span> $(which zsh)

<span class="hljs-comment"># 重新登录</span>
logout</code></pre>

<h4 id="安装oh-my-zsh">安装oh-my-zsh</h4>



<pre class="prettyprint"><code class="language-bash hljs ">sh -c <span class="hljs-string">"<span class="hljs-variable">$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)</span>"</span></code></pre>

<h4 id="切换zsh皮肤">切换zsh皮肤</h4>



<pre class="prettyprint"><code class="language-bash hljs ">vim ~/.zshrc</code></pre>

<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 修改字段</span>
ZSH_THEME=<span class="hljs-string">"ys"</span></code></pre>

<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 重新登录</span>
logout</code></pre>

<h4 id="添加用户和默认组wheel">添加用户和默认组(wheel)</h4>



<pre class="prettyprint"><code class="language-bash hljs ">useradd lvyuang -g wheel</code></pre>

<h4 id="设置用户密码">设置用户密码</h4>



<pre class="prettyprint"><code class="language-bash hljs ">passwd lvyuang</code></pre>

<h4 id="设置免密码ssh登录">设置免密码ssh登录</h4>



<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 创建~/.ssh目录</span>
mkdir ~/.ssh

<span class="hljs-comment"># 将公钥复制到远程</span>
scp id_rsa.pub root@[your_ip]:/home/lvyuang/.ssh/authorized_keys

<span class="hljs-comment"># 设置权限</span>
chmod <span class="hljs-number">700</span> ~/.ssh
chown lvyuang:wheel ~/.ssh/authorized_keys
chmod <span class="hljs-number">600</span> ~/.ssh/authorized_keys</code></pre>

<h4 id="设置免密码sudo">设置免密码sudo</h4>



<pre class="prettyprint"><code class="language-bash hljs ">vim /etc/sudoers</code></pre>

<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 修改字段</span>
wheel ALL=(ALL) NOPASSWD: ALL</code></pre>

<h4 id="显示vim行号">显示vim行号</h4>



<pre class="prettyprint"><code class="language-bash hljs ">vim /etc/vimrc</code></pre>

<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 添加</span>
<span class="hljs-keyword">set</span> number</code></pre>

<h4 id="安装node环境">安装node环境</h4>



<pre class="prettyprint"><code class="language-bash hljs "><span class="hljs-comment"># 安装nvm</span>
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.<span class="hljs-number">31.7</span>/install.sh | bash

<span class="hljs-comment"># 安装node</span>
nvm install v6.<span class="hljs-number">5.0</span></code></pre>

<h4 id="安装redis">安装redis</h4>



<pre class="prettyprint"><code class="language-bash hljs ">wget http://download.redis.io/releases/redis-<span class="hljs-number">3.2</span>.<span class="hljs-number">3</span>.tar.gz
--<span class="hljs-number">2016</span>-<span class="hljs-number">09</span>-<span class="hljs-number">12</span> <span class="hljs-number">22</span>:<span class="hljs-number">54</span>:<span class="hljs-number">14</span>--  http://download.redis.io/releases/redis-<span class="hljs-number">3.2</span>.<span class="hljs-number">3</span>.tar.gz

tar xzf redis-<span class="hljs-number">3.2</span>.<span class="hljs-number">3</span>.tar.gz

<span class="hljs-comment"># 安装gcc</span>
yum install -y gcc

<span class="hljs-comment"># macos中，不需要加MALLOC参数</span>
make MALLOC=libc

<span class="hljs-comment"># 安装tcl</span>
yum install -y tcl

<span class="hljs-comment"># 运行测试脚本</span>
make test

<span class="hljs-comment"># 安装(切换到root)</span>
make install

<span class="hljs-comment"># 生成配置文件</span>
<span class="hljs-built_in">cd</span> utils
./install_server.sh

<span class="hljs-comment"># 进入redis命令行</span>
<span class="hljs-comment"># (进入redis-cli后运行shutdown，可以关闭服务)</span>
redis-cli

<span class="hljs-comment"># 启动redis server</span>
redis-server</code></pre>

<h4 id="开放3000端口">开放3000端口</h4>



<pre class="prettyprint"><code class="language-bash hljs ">firewall-cmd --zone=public --add-port=<span class="hljs-number">3000</span>/tcp --permanent

firewall-cmd --reload</code></pre>`;

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