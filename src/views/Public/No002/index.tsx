import { useCallback, useEffect, useState } from "react"

const No002 = () => {
  const [cards, setCards] = useState<Array<Card>>([])

  type Card = {
    src: string
    title: string
    content: string
  }

  const card = useCallback(
    (src: string, title: string, content: string): Card => {
      return {
        src,
        title,
        content,
      }
    },
    []
  )

  useEffect(() => {
    const initCards: Array<Card> = []
    initCards.push(
      card(
        `https://picsum.photos/500/400?random=1`,
        "菜雞都會切這個畫面：圖文互動卡片",
        "圖文互動卡片雖然很常見，但是我一開始還是不太會切，所以只好學著做"
      )
    )
    initCards.push(
      card(
        `https://picsum.photos/500/400?random=2`,
        "但是我是菜雞，所以我要學一下",
        "圖文互動卡片原來就是這樣切，多切幾張來看看"
      )
    )
    initCards.push(
      card(
        `https://picsum.photos/500/400?random=3`,
        "第三張圖片還是可以自己產出來",
        "不過這個頁面沒有RWD，還要學一下RWD的做法呢"
      )
    )
    initCards.push(
      card(
        `https://picsum.photos/500/400?random=4`,
        "最後一張圖了啦",
        "大功告成！"
      )
    )

    setCards(initCards)
  }, [card])

  return (
    <>
      <div className="no002-warp">
        {cards.map((card, index) => (
          <div className="no002-item" key={index}>
            <img src={card.src} />
            <div className="no002-txt">
              <h2>{card.title}</h2>
              <p>{card.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default No002
