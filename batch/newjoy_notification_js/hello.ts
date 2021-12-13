import { dayjs } from './src/plugins/dayjs'
import { fetchLatestUuYellPosts } from './src/infra/fetchUuYell'


console.log('Hello, World!');

// 現在時刻
const dtNow = dayjs()
// 1日前の時刻
const dtBefore = dayjs().add(-1, 'day')
console.log({ dtNow, dtBefore });

(async () => {
    // uu-yell の記事取得
    const posts = await fetchLatestUuYellPosts({
        dtNow,
        dtBefore,
    })
    console.log({ posts })
})()
