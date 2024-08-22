import Image from 'next/image'

export default function Item(props) {
   return (
      <>
         <div>{props.title}</div>
         <Image src={props.img} width={500} height={500} alt={props.title}></Image>
      </>
   )
}
