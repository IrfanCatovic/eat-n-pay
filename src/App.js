import { useState } from "react";
import FriendsList from "./Components/FriendsList";
import Button from "./Components/Button";
import FormAddFriend from "./Components/FormAddFriend";
import FormSplitBill from "./Components/FormSplitBill";

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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show); //svejedno koje je ime mozemo i showaddfriend ili show
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectnedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        {/* Ako je stateShowAddFriend true onda pokaze FormAddFriend */}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
          {/* Ako je state showAddFriend true onda je forma otvorena i button treba
          da pise close */}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
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
