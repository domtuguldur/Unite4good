// stores/app.ts
import { defineStore } from 'pinia'

// ── Types ──────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  type: 'user' | 'company'
  avatar: string
  photo?: string
  cover?: string
  score: number
  programs: number
  challenges: number
  volunteers?: number
  bio: string
}

export interface Program {
  id: string
  type: 'program'
  title: string
  org: string
  orgId: string
  category: string
  date: string
  spots: number
  joined: number
  score: number
  desc: string
  organizer: string
  tags: string[]
}

export interface Challenge {
  id: string
  type: 'challenge'
  title: string
  creator: string
  creatorId: string
  joined: number
  desc: string
  tags: string[]
  date: string
}

export interface Comment {
  id: string
  user: string
  avatar: string
  text: string
  time: string
}

// ── Seed data ──────────────────────────────────────────────────────────────
const SEED_PROGRAMS: Program[] = [
  { id:'p1', type:'program', title:'Urban Tree Planting Drive',    org:'GreenCity Corp',     orgId:'c1', category:'Environment', date:'Apr 12, 2026',  spots:80, joined:54, score:4.7, desc:"Join us to plant 500 trees across the city's underdeveloped districts. Gloves and tools provided. Lunch included. Meet at City Hall Plaza at 8am.", organizer:'Sarah M.',  tags:['outdoor','environment'] },
  { id:'p2', type:'program', title:'Youth Coding Bootcamp Mentor', org:'TechForAll Inc.',    orgId:'c2', category:'Education',   date:'May 3–17, 2026', spots:20, joined:18, score:4.9, desc:'Mentor high-school students learning web development. Two weekends, 4 hours each. Remote or on-site. Basic HTML/CSS/JS required.',                 organizer:'James K.',  tags:['tech','education'] },
  { id:'p3', type:'program', title:'Elderly Companion Visits',     org:'Sunrise Foundation', orgId:'c3', category:'Social',     date:'Every Sat',      spots:30, joined:12, score:4.5, desc:'Spend 2 hours weekly with elderly residents at a local care home. Bring a book, a game, or just your time. Training provided on first visit.',      organizer:'Lena P.',   tags:['social','elderly'] },
  { id:'p4', type:'program', title:'Food Bank Logistics Crew',     org:'GreenCity Corp',     orgId:'c1', category:'Hunger',     date:'Apr 19, 2026',   spots:40, joined:39, score:4.6, desc:'Help sort, pack, and distribute food parcels to families in need. Physical work — comfortable clothes recommended. Shift starts at 7am.',           organizer:'Dara O.',   tags:['hunger','logistics'] },
]

const SEED_CHALLENGES: Challenge[] = [
  { id:'ch1', type:'challenge', title:'1-Day No Plastic Challenge',    creatorId:'u2', creator:'Maya R.',   joined:1240, desc:'Go 24 hours without using single-use plastic. Document your day and tag three friends to join. Post proof with #NoPlasticDay.', tags:['environment'], date:'Ongoing' },
  { id:'ch2', type:'challenge', title:'Clean a Street Near You',       creatorId:'u3', creator:'Arjun S.',  joined:880,  desc:'Grab a bag, clean a street or park near you. Post a before/after photo and nominate your neighbors to do the same.',           tags:['community'],   date:'Ongoing' },
  { id:'ch3', type:'challenge', title:'Teach One Skill to a Stranger', creatorId:'u1', creator:'Fatima B.', joined:430,  desc:'Teach someone a skill you have — cooking, coding, craft. Share the story. Spread knowledge freely.',                           tags:['education'],   date:'Ongoing' },
]

export const COMPANIES = [
  { id:'c1', name:'GreenCity Corp',     type:'company', score:4.8, programs:3, volunteers:210, bio:'A sustainability-first urban development company dedicated to greener cities.',    avatar:'GC' },
  { id:'c2', name:'TechForAll Inc.',    type:'company', score:4.9, programs:2, volunteers:98,  bio:'Bridging the digital divide through education and mentoring programs.',              avatar:'TF' },
  { id:'c3', name:'Sunrise Foundation', type:'company', score:4.5, programs:1, volunteers:62,  bio:'Nonprofit focused on elderly care and community wellbeing.',                        avatar:'SF' },
]

export const VOLUNTEERS = [
  { id:'u1', name:'Alex Kim', type:'user', score:4.6, programs:5, challenges:2, bio:'Software engineer by day, community volunteer by weekend.', avatar:'AK' },
  { id:'u2', name:'Maya R.',  type:'user', score:4.8, programs:3, challenges:4, bio:'Environmental activist and challenge creator.',             avatar:'MR' },
  { id:'u3', name:'James K.', type:'user', score:4.7, programs:4, challenges:1, bio:'Tech mentor and education advocate.',                       avatar:'JK' },
]

export const SAMPLE_COMMENTS: Comment[] = [
  { id:'cm1', user:'Alex Kim', avatar:'AK', text:'Absolutely loved this. Well-organized and impactful.',            time:'2d ago' },
  { id:'cm2', user:'Maya R.',  avatar:'MR', text:'The organizer was amazing. Already signed up for the next one!', time:'1d ago' },
  { id:'cm3', user:'James K.', avatar:'JK', text:'Highly recommend to anyone looking to give back.',                time:'3h ago' },
]

export const CAT_COLOR: Record<string, string> = {
  Environment: '#2DBAB3',
  Education:   '#90CAF9',
  Social:      '#FF8A65',
  Hunger:      '#FFB74D',
  Health:      '#66BB6A',
  Animals:     '#AB47BC',
  Arts:        '#7E57C2',
}

// ── Store ──────────────────────────────────────────────────────────────────
export const useAppStore = defineStore('app', {
  state: () => ({
    currentUser: null as User | null,
    programs:    [...SEED_PROGRAMS] as Program[],
    challenges:  [...SEED_CHALLENGES] as Challenge[],
    toast:       '' as string,
    _toastTimer: null as ReturnType<typeof setTimeout> | null,
  }),

  getters: {
    isLoggedIn:  (s) => !!s.currentUser,
    isCompany:   (s) => s.currentUser?.type === 'company',
    getProgram:  (s) => (id: string) => s.programs.find(p => p.id === id),
    getChallenge:(s) => (id: string) => s.challenges.find(c => c.id === id),
  },

  actions: {
    login(user: User) {
      this.currentUser = user
    },
    logout() {
      this.currentUser = null
    },
    updateUser(patch: Partial<User>) {
      if (this.currentUser) this.currentUser = { ...this.currentUser, ...patch }
    },
    addProgram(p: Program) {
      this.programs.unshift(p)
    },
    addChallenge(c: Challenge) {
      this.challenges.unshift(c)
    },
    showToast(msg: string) {
      this.toast = msg
      if (this._toastTimer) clearTimeout(this._toastTimer)
      this._toastTimer = setTimeout(() => { this.toast = '' }, 2800)
    },
  },
})
