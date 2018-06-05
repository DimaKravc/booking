'use strict'

import axios from 'axios'

axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://6600.kravchenko.titan.paymo.ru/api/'
axios.defaults.headers.common['KoSiteKey'] = 'test198'
