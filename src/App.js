import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show); //svejedno koje je ime mozemo i showaddfriend ili show
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* Ako je stateShowAddFriend true onda pokaze FormAddFriend */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
          {/* Ako je state showAddFriend true onda je forma otvorena i button treba
          da pise close */}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = { id, name, image: `${image}?=${id}`, balance: 0 }; //creating random ID crypto.randomUUID()
    //this thing we write for image is that everytime we load page image doesnt change

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>🌆 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function Friend({ friend }) {
  return (
    <li>
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

      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with FRIEND</h2>

      <label>💵Bill value</label>
      <input type="text"></input>

      <label>🪓 Your expense</label>
      <input type="text"></input>

      <label>👨‍👧Friend's expense</label>
      <input type="text" disabled></input>

      <label>💲 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">x</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

// FUNKCIONISANJE FORME I PRIKAZIVANJE U LISTU SA LIFT STATE UP
//------------------------------------------------------------------
// 1. Kreiramo komponente staticne Lista i Form
// 2. U formu kreiramo submit i da se na submit pamti novi user koji deklarisemo u Form
//    A u listi kreiramo staticnu listu sa property koje unesemo manuelno
// 3. Kreiramo const[imeListe, setImeListe] = useState('prazno')
//    saljemo funkciju handeDodajFormu kroz komponentu form
//    a u formi pozivamo f-ju sa novim kreiranim userom da je vratimo u handleDodajFormu
// 4. u f-ju handleDodajFormu koristimo setFriends((friends) => [...friends, friend]);
//    da bismo pamtili nove unete koji nam se salju iz komponente Form
// 5. Tu novu listu Friends saljemo kroz komponentu List gde je ispisujemo preko funkcije friends.map
