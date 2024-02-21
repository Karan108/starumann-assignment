export function formatAddresses(addresses) {
  return addresses?.map((address) => {
    const { use, line, city, state, postalCode, country } = address;
    const parts = [line?.join(", "), city, state, postalCode, country]?.filter(
      (part) => part && part.trim()?.length > 0
    );
    return `${
      use ? use.charAt(0).toUpperCase() + use.slice(1) + " address: " : ""
    }${parts.join(", ")}`;
  });
}
