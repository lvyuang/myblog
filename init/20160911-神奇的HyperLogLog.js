const service = require('../routes/services/article');

const articleId = 'HyperLogLog';
const title = '神奇的HyperLogLog';
const subtitle = '聪明人想出来的解决方案';
const createTime = (new Date(2016, 8, 11) - 0);
const desc = 'HyperLogLog(后称HLL)是一种统计算法，用于统计大规模不重复的事物总数，比如一个网站一天的UV。其实，不用HLL也可以达到同样的目的，思路很简单。。。';
const url = '2016/09/11/' + articleId;
const categories = [{categoryId: 'original', categoryName: '原创'}, {categoryId: 'redis', categoryName: 'Redis'}, {categoryId: 'algorithm', categoryName: '算法'}];
const content = `<p>HyperLogLog(后称HLL)是一种统计算法，用于统计大规模不重复的事物总数，比如一个网站一天的UV。</p>

<p>其实，不用HLL也可以达到同样的目的，思路很简单，记住每一个userId，如果接收到新的userId，总数加1，否则总数不变。</p>

<p>但是这样做有一个很明显的问题，算法要保存每一个访问过的userId，随着数据量的增大，算法对内存的需求也就越大，访问量大的网站是承受不了这样的内存开销的，而且随着数据量的增大，速度也会变慢。</p>

<p>HLL可以做到在速度飞快的同时，内存需求量极低的统计出总数，代价是牺牲一定的精度。</p>

<p>在redis中实现的版本，只需要消耗12k的内存空间，可以达到0.81%的误差，由于大规模数据统计往往不需要100%的精确，这个误差范围在大多数情况下是完全可以接受的。</p>

<p>举例说明HLL的主要实现思路：</p>

<p>要统计一天的IP访问量，首先将每一个IP通过hash函数转换成二进制数字。理想状态下，如果在一堆分布均匀的数字中，以0开头的数字会占到总数的50%，以01开头的数字占到25%，以001开头的数字占到12.5%，以此类推，也就是说，只要统计出最长的以0开头的数字的个数，也就大概知道总数了。</p>

<p>实现这个逻辑有两个问题要解决，一是如何让这堆数字均匀的分布，这直接影响统计结果。二是，如果总数不大的情况，突然出现一个很长的以0开头的数字，那么结果肯定也不准确。</p>

<p>第一个问题可以通过好的hash算法解决，redis使用的算法是MurmurHash64A，能够保证性能的同时，做到良好的均匀分布。</p>

<p>第二个问题可以通过多次统计，而后通过一定的数学运算，消除这种小概率事件。redis中使用了16384个6位的寄存器，可以统计几乎无限的数据量(2^64)。</p>`;

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