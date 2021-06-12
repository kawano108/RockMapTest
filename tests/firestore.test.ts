import * as firebase from "@firebase/testing";
import * as fs from "fs";

type Auth = {
  uid?: string,
  [key: string]: any
}

type SocialLink = {
  linkType: string
  link:     string
}

type User = {
  id:           string
  createdAt:    Date
  updatedAt:    Date
  parentPath:   string
  name:         string
  photoURL:     URL
  socialLinks:  SocialLink[]
  introduction: string
  headerUrl:    URL
  deleted:      Boolean
  isRoot:       Boolean   
}

const testName = 'firestore-local-emulator-test'
const projectId = "rockmap-70133"
const databaseName = 'RockMap-debug'
const rules = fs.readFileSync('./firestore.rules', 'utf8')
const authedApp = (auth?: Auth) => firebase.initializeTestApp({ projectId: projectId, databaseName, auth }).firestore()
const adminApp = firebase.initializeAdminApp({ projectId: projectId, databaseName }).firestore()
const userCollectionId = 'users'
const today = new Date()


// 認証付きのFreistore appを作成する
const createAuthApp = (auth?: object): firebase.firestore.Firestore => {
  return firebase
    .initializeTestApp({ projectId: testName, auth: auth })
    .firestore();
};

// 管理者権限で操作できるFreistore appを作成する
const createAdminApp = (): firebase.firestore.Firestore => {
  return firebase.initializeAdminApp({ projectId: testName }).firestore();
};

// user情報への参照を作る
const usersRef = (db: firebase.firestore.Firestore) => db.collection("user");

// ルールファイルの読み込み
beforeAll(async () => {
  await firebase.loadFirestoreRules({
    projectId: projectId,
    rules: rules
  })
})

// Firestoreデータのクリーンアップ
afterEach(async () => {
  await firebase.clearFirestoreData({ projectId: projectId });
});

// Firestoreアプリの削除
afterAll(async () => {
  await Promise.all(firebase.apps().map(app => app.delete()));
});

describe('/users', () => {
  describe('read', () => {
    it('can not create', async () => {
      const db = authedApp()
      const user = createTestUser()

      await firebase.assertFails(db.collection('users').doc(user.id).set(user))
    })
  })
})


function configureUserTestData(documentId: string) {
  const db = adminApp
  return db.collection(userCollectionId).doc(documentId).set(createTestUser())
}

function createTestUser(): User {
  const url = new URL('https://javascript.info/url')

  return {
    id:           Math.random().toString(32).substring(2),
    createdAt:    today,
    updatedAt:    today,
    parentPath:   '',
    name:         'testUser',
    photoURL:     url,
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
    headerUrl:    url,
    deleted:      false,
    isRoot:       true 
  }
}
