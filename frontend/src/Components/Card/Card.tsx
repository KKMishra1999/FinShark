import './Card.css'

const Card = () => {
  return (
    <div className='card'>
        <img src="https://plus.unsplash.com/premium_photo-1681711647066-ef84575c0d95?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Image" />
        <div className='details'>
            <h2>Apple</h2>
            <p>$110</p>
        </div>
        <p className='info'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, recusandae?
        </p>
    </div>
  )
}

export default Card