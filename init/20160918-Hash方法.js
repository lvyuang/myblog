const service = require('../routes/services/article');

const articleId = 'hash-function';
const title = 'Hash方法';
const subtitle = '速读Hash方法';
const createTime = (new Date(2016, 8, 18) - 0);
const desc = 'Hash可以用于索引、相似性查找、概率统计、加密等方面，是数据结构的基础，有点像轴承在机械制造领域内的地位。。。';
const url = '/2016/09/18/' + articleId;
const categories = [{categoryId: 'original', categoryName: '原创'}];
const content = `<p>Hash方法是将任意长度的数据转换成固定长度的数据。</p>

<p>Hash可以用于索引、相似性查找、概率统计、加密等方面，是数据结构的基础，有点像轴承在机械制造领域内的地位。</p>

<p>Hash主要有以下几个特性：</p>

<ul>
<li>确定性</li>
<li>均匀分布</li>
<li>不可逆</li>
</ul>

<p>好的Hash根据不同的使用场景，呈现出不同的特性。</p>

<p>比如说，用于加密时，要求算法尽可能做到不碰撞，比如md5、sha1，几乎可以认为是不可能发生碰撞的。</p>

<p>但用于模糊查找时，则要把相似内容尽量映射到同一个key上，也就是说，尽量增大碰撞几率。</p>

<p>所以抛开使用场景讲算法是没有意义的。</p>



<h2 id="确定性">确定性</h2>

<p>同样的输入产生同样的输出结果。</p>



<h2 id="均匀分布">均匀分布</h2>

<p>尽可能的在一定范围内均匀分布，这很重要，比如在做一些概率统计时，好的均匀分布算法带来的结果更准确。</p>

<p>均匀分布不等于随机分布，一般来说，好的随机分布算法都是均匀的，但反过来不成立。</p>



<h2 id="不可逆">不可逆</h2>

<p>不能从结果倒推出输入数据。这主要应用于加密算法中，也叫<a href="https://en.wikipedia.org/wiki/One-way_function">One Way Function</a>。</p>`;

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