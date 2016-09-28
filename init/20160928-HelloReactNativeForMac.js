const service = require('../routes/services/article');

const articleId = 'Hello-React-Native-For-Mac';
const title = 'Hello React Native For Mac';
const subtitle = '创建一个 React Native 项目';
const createTime = (new Date(2016, 8, 28) - 0);
const desc = '参考 React Native 的官方文档一步步下来，还是会遇到问题，尤其是关于 Android Studio 的操作讲的不很详细，特此记录。。。';
const url = '/2016/09/28/' + articleId;
const categories = [{categoryId: 'memo', categoryName: '备忘'}];
const content = `<p>参考 React Native 的官方文档一步步下来，还是会遇到问题，尤其是关于 Android Studio 的操作讲的不很详细，特此记录。</p>

<h3 id="安装watchman">安装watchman</h3>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; brew install watchman</code></pre>



<h3 id="安装react-native-cli">安装react native cli</h3>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; npm install -g react-native-cli</code></pre>



<h3 id="下载并安装-android-studio">下载并安装 <a href="https://developer.android.com/studio/install.html">Android Studio</a></h3>



<h3 id="初始化项目">初始化项目</h3>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; react-native init AwesomeProject</code></pre>



<h3 id="载入项目">载入项目</h3>



<h4 id="打开-android-studio">打开 Android Studio</h4>

<p><img src="/resources/article/20160928-HelloReactNative/1.webp" alt="" title=""></p>

<p><img src="/resources/article/20160928-HelloReactNative/1.5.webp" alt="" title=""></p>

<p><img src="/resources/article/20160928-HelloReactNative/2.webp" alt="" title=""></p>



<h3 id="安装sdk">安装SDK</h3>

<p><img src="/resources/article/20160928-HelloReactNative/3.webp" alt="" title=""> <br>
<em>打开 SDK Manager</em></p>

<p><img src="/resources/article/20160928-HelloReactNative/4.webp" alt="" title=""> <br>
<em>选中 Show Package Detail</em></p>

<p><img src="/resources/article/20160928-HelloReactNative/5.webp" alt="" title=""> <br>
<em>安装勾选的内容</em></p>



<h3 id="安装编译工具">安装编译工具</h3>

<p><img src="/resources/article/20160928-HelloReactNative/5.5.webp" alt="" title=""></p>

<h3 id="安装android虚拟机">安装Android虚拟机</h3>

<p><img src="/resources/article/20160928-HelloReactNative/6.webp" alt="" title=""> <br>
进入 AVD Manager</p>

<p><img src="/resources/article/20160928-HelloReactNative/7.webp" alt="" title=""> <br>
创建一个虚拟机</p>

<p><img src="/resources/article/20160928-HelloReactNative/8.webp" alt="" title=""> <br>
选择一个设备</p>

<p><img src="/resources/article/20160928-HelloReactNative/9.webp" alt="" title=""> <br>
安装 Android 6.0(64位) 虚拟机</p>

<p><img src="/resources/article/20160928-HelloReactNative/10.webp" alt="" title=""> <br>
打开虚拟机</p>

<p><img src="/resources/article/20160928-HelloReactNative/11.webp" alt="" title=""> <br>
虚拟机成功开启</p>



<h3 id="安装-adb">安装 ADB</h3>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; brew install android-platform-tools</code></pre>

<p>检查虚拟机是否已连接</p>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; adb devices

List of devices attached
emulator-<span class="hljs-number">5554</span>   device</code></pre>



<h3 id="启动程序">启动程序</h3>



<pre class="prettyprint"><code class="language-bash hljs ">&gt; <span class="hljs-built_in">cd</span> AwesomeProject
&gt; react-native run-android</code></pre>



<h3 id="启动后画面">启动后画面</h3>

<p><img src="/resources/article/20160928-HelloReactNative/12.webp" alt="" title=""></p>`;

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