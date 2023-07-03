import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query Items {
    items {
      categoryId
      description
      id
      imgUrl
      mongoId
      name
      price
    }
  }
`;

export const GET_ITEMS_BY_ID = gql`
  query Items($itemId: Int) {
    item(id: $itemId) {
      id
      name
      price
      mongoId
      imgUrl
      description
      categoryId
      Ingredients {
        name
        itemId
        id
      }
      Category {
        name
        id
      }
      AdditionalImages {
        itemId
        image
        id
      }
      user {
        username
        role
        phoneNumber
        password
        email
        address
        _id
      }
    }
  }
`;
