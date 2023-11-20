import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  //dok lista prijatelje kroz Map funkciju onda proverava da li je selektovan id
  //isti kao id nekog od prijatelja
  //ovu const smo pravili zbog className
  //ako je selektovan da dodamo odredjeni style na tog <Friend/>

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="friend.name" />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} ows you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
