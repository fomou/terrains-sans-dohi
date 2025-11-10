
"user client";
import { useState, useEffect, useRef, createContext, useContext, ReactNode } from "react";

import Link from "next/link";
import { useUser } from "@/contexts/user-context";
import { Property, User } from "@/types/user";

interface PropertyContextType {
  seller: User | null;
  buyer?: User | null;
  property: Property | null;
  propertyList: Property[] | null;
  setProperty?: (property: Property) => void;
  setPropertyList?: (propertyList: Property[]) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [property, setPropertyState] = useState<Property | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
const [propertyList, setPropertyListState] = useState<Property[] | null>([]);
    const [buyer, setBuyer] = useState<User | null>(null);
  const userContext = useUser();

  useEffect(() => {
    if (userContext?.user) {
      setBuyer(userContext.user);
    }
  }, [userContext]);

  useEffect(() =>{
    const findSeller = async () => {
      if (property && property.sellerId) {
        const response = await fetch(`http://localhost:8280/users/${property.sellerId}`);
        if (response.ok) {
          const data = await response.json();
          setSeller(data);
        } else {
          console.error("Failed to fetch seller data");
        }
      }
    }
    findSeller();
  } , [property]);

    useEffect(() => {
        const fetchProperties = async () => {
        try {
            const response = await fetch("http://localhost:8280/properties");
            if (response.ok) {
            const data = await response.json();
            setPropertyList(data);
            } else {
            console.error("Failed to fetch properties");
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
        };
        fetchProperties();
    }, []);

    const setProperty = (property: Property) => {
        setPropertyState(property);
    }
    const setPropertyList = (propertyList: Property[]) => {
        setPropertyListState(propertyList);
    }

  return (
    <PropertyContext.Provider value={{ seller,buyer, property, propertyList, setProperty, setPropertyList }}>
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
}
