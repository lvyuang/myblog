import React from 'react';
import TemplateArticle from 'templates/article';

const articleId = 'opening';

class Index extends React.Component {
    render() {
        const {params} = this.props;

        return <TemplateArticle
            articleId={articleId}
            params={params}
            content={`<h2 id="开始"><i class="icon-emo-happy"></i>开始</h2>

<p>一直想做一个个人博客，除了想写点东西的冲动外，也可以熟悉一下目前比较流行的技术，且自己的网站不受约束，可以边学边做边优化。</p>

<p>说到技术，本站是SPA，全程跳转无尿点。基于react + redux，使用webpack构建。SPA的体验好，但增加了开发复杂度。做SPA比想象中的细节更多，比如如何<strong>按需加载内容</strong>，如何<strong>SEO</strong>，如何<strong>hot reload</strong>，如何统计<strong>PV/UV</strong>等等。</p>

<p>这些问题会在后续文章中一一阐述，现在从头开始。</p>

<h2 id="目录">目录</h2>

<ol>
<li>项目初始化</li>
<li>webpack基础内容</li>
<li>使用webpack构建网站</li>
<li>react基础内容</li>
<li>在webpack环境中使用es6、less和jsx</li>
<li>自动检查代码规范（eslint）</li>
<li>redux基础内容</li>
<li>使用Node构建Ajax API</li>
<li>react-router基础内容</li>
<li>重新设计SPA的目录结构</li>
<li>动态加载页面</li>
<li>动态加载reducers</li>
<li>增加页面切换时的动画效果</li>
<li>编写测试用例</li>
<li>部署</li>
</ol>`}
        />;
    }
}

export default Index;