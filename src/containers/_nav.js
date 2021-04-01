import React from 'react'
import CIcon from '@coreui/icons-react'


const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'HOME',
    to: '/dashboard',
    icon: <CIcon name="cil-list" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
 
  {
    _tag: 'CSidebarNavTitle',
    _children: ['고객']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '고객관리',
    route: '/base',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavDropdown',
    name: '회원정보변경',
    route: '/base',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '정보수정',
        to: '/memberUpdate/MemberInfo',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '보유계좌 리스트',
        to: '/base/cards',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '등록상품 리스트',
        to: '/base/carousels',
      },
     
  ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '계좌정보',
    route: '/AccountInfo',
    _children: [
  {
    _tag: 'CSidebarNavItem',
    name: '회원 계좌정보',
    to: '/AccountInfo/AccList',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '계좌해지,휴면',
    to: '/AccountInfo/ACCPWchange',
  },
  {
    _tag: 'CSidebarNavItem',
    name: '회원별 계좌이체',
    to: '/AccountInfo/AccountTransferList',
  },

    ],
   },
  ],
},
  {
    _tag: 'CSidebarNavDropdown',
    name: '서비스',
    route: '/buttons',
    icon: 'cil-star',
    _children: [
      {
        _tag: '입출금이상확인',
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      
    ],
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['금융상품']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '예금',
    route: '/AdminDepositProduct',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavDropdown',
    name: '예금상품',
    route: '/AdminDepositProduct',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '예금조회',
        to: '/AdminDepositProduct/DeposirProductList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '예금등록',
        to: '/test/test',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '예금수정',
        to: '/test/test',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '예금삭제',
        to: '/test/test',
      },
    ],
  },
 ],
},
{
  _tag: 'CSidebarNavDropdown',
  name: '적금',
  route: '/notifications',
  icon: 'cil-star',
  _children: [
    {
      _tag: 'CSidebarNavDropdown',
  name: '적금상품',
  route: '/notifications',
  _children: [
    {
      _tag: 'CSidebarNavItem',
      name: '적금승인',
      to: '/savings/SavingsApproveList',
    },
    {
      _tag: 'CSidebarNavItem',
      name: '적금등록',
      to: '/savings/SavingsRegistration',
    },
    {
      _tag: 'CSidebarNavItem',
      name: '적금상품조회',
      to: '/savings/SavingsProductList',
    },
  ],
},
],
},
{
  _tag: 'CSidebarNavDropdown',
  name: '대출',
  route: '/charts',
  icon: 'cil-star',
  _children: [
    {
      _tag: 'CSidebarNavDropdown',
  name: '대출상품',
  route: '/charts',
  _children: [
    {
      _tag: 'CSidebarNavItem',
      name: '대출조회',
      to: '/charts/ChartBarSimple',
    },
    {
      _tag: 'CSidebarNavItem',
      name: '대출등록',
      to: '/charts/ChartLineSimple',
    },
    {
      _tag: 'CSidebarNavItem',
      name: '대출수정',
      to: '/charts/Charts',
    },
    {
      _tag: 'CSidebarNavItem',
      name: '대출삭제',
      to: '/charts/MainChartExample',
    },
  ],
},
],
},
{
  _tag: 'CSidebarNavTitle',
  _children: ['펀드']
},
  {
    _tag: 'CSidebarNavDropdown',
    name: '펀드',
    route: '/Fund',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '펀드승인요청리스트',
        to: '/Fund/FundList',
      },
    ]
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['고객센터'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: '고객센터',
    route: '/ServiceCenter',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: '공지사항',
        to: '/ServiceCenter/Notice',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '고객상담',
        to: '/ServiceCenter/Counseling',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '챗봇',
        to: '/ServiceCenter/Chatbot',
      },
      {
        _tag: 'CSidebarNavItem',
        name: '챗봇설정',
        to: '/ServiceCenter/AdminChatbot',
      },
    ],
  },
  
]

export default _nav
