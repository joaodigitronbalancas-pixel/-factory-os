function CardKPI({ titulo, valor }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        width: "220px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,.1)"
      }}
    >
      <h2>{valor}</h2>
      <p>{titulo}</p>
    </div>
  );
}

export default CardKPI;