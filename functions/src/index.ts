import * as admin from 'firebase-admin';

admin.initializeApp();

import { addDocumentFunction } from './entrypoint/addDocumentFunction';
import { incrementIdTrigger } from './entrypoint/incrementIdTrigger';

exports.addDocumentFunction = addDocumentFunction;
exports.incrementIdTrigger = incrementIdTrigger;
