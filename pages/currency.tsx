import { useState } from "react"

export default function Currency() {
    const [data, setData] = useState('myCurrecyData')
    return <div>Currency {data}</div>
}

// export async function getServerSideProps() {
//     return {
//         props: { currencyData: 'currencyData' }, // will be passed to the page component as props
//     }
// }