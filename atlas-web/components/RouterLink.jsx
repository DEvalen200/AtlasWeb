import { useRouter } from 'next/router'

function RouterLink({ children, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push({url:href}, {as:"/"},  { scroll: true, shallow: true })

  }

  return (
    <a href={href} onClick={handleClick} >
      {children}
    </a>
  )
}

export default RouterLink