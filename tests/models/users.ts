
export interface User {
    id:           string
    createdAt:    Date
    updatedAt:    Date
    parentPath:   string
    name:         string
    photoURL:     string
    socialLinks:  SocialLink[]
    introduction: string
    headerUrl?:    string
    deleted:      Boolean
    isRoot:       Boolean   
}

interface SocialLink {
    linkType: string
    link:     string
}

export function dummyUser(id: string): User {
    return {
      id:           id,
      createdAt:    new Date(),
      updatedAt:    new Date(),
      parentPath:   '',
      name:         'testUser',
      photoURL:     'https://javascript.info/url',
      socialLinks:  [
        {
          linkType: 'twitter',
          link: 'aaaa'
        },
        {
          linkType: 'facebook',
          link: 'bbbb'
        },
      ],
      introduction: 'これはプロフィールです。',
      headerUrl:    'https://javascript.info/url',
      deleted:      false,
      isRoot:       true 
    }
  }
