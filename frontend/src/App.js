import { useState, useEffect } from "react";
import ContactList from "./ContactList";
import "./App.css";
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, []);

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }
  
  const updateNotes = async (contact) => {
    const newNotes = prompt("Enter new notes:", contact.notes || "");
    if (newNotes !== null) {
      const response = await fetch("http://127.0.0.1:5000/update_notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: contact.email,
          notes: newNotes
        })
      });
      if (response.status === 200) {
        fetchContacts();
      } else {
        alert("Failed to update notes");
      }
    }
  }
  return (
    <>
      <ContactList contacts={contacts}
      updateContact={openEditModal} 
      updateCallback={onUpdate}
      updateNotes={updateNotes} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
}

export default App;