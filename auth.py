from flask import Blueprint, jsonify, request, session, abort
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

from app import db
from models import Employer, Applicant

auth_router = Blueprint(__name__, 'auth')

def login_required(fn):
    @wraps(fn)
    def check_login(*args, **kwargs):
        if not session.get('current_user', None):
            abort(403, 'Login required')
        return fn(*args, **kwargs)
    return check_login

@auth_router.route('/api/register/', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    account_type = request.json.get('account_type')

    password_hash = generate_password_hash(str(password))

    if account_type == 'applicant':
        applicant = Applicant(username=username, password_hash=password_hash)
        db.session.add(applicant)
        db.session.commit()

        applicant_dict = applicant.to_dict()
        session['current_user'] = applicant_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': applicant_dict
    })

    else:
        employer = Employer(username=username, password_hash=password_hash)
        db.session.add(employer)
        db.session.commit()

        employer_dict = employer.to_dict()
        session['current_user'] = employer_dict
        return jsonify({
        'success': 'success',
        'message': 'Successfully registered',
        'user': employer_dict
    })

@auth_router.route('/api/login/', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    account_type = request.json.get('account_type')


    if account_type == 'applicant':
        applicant = Applicant.query.filter_by(username=username).first()
        if not applicant:
            abort(404, 'User not found')
        if not check_password_hash(applicant.password_hash, password):
            abort(403, 'Username and password don\'t match')
        applicant_dict = applicant.to_dict()
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': applicant_dict
        })
    else:
        employer = Employer.query.filter_by(username=username).first()
        if not employer:
            abort(404, 'Member of staff not found')
        if not check_password_hash(employer.password_hash, password):
            abort(403, 'Username and password don\'t match')
        employer_dict = employer.to_dict()
        return jsonify({
        'success': 'success',
        'message': 'Successfully logged in',
        'user': employer_dict    
        })


@auth_router.route('/api/logout/', methods=['POST'])
def logout():
    session.pop('current_user', None)
    return jsonify({
        'status': 'Success',
        'message': 'Successfully logged out'
    })

@auth_router.route('/api/verify/', methods=['GET'])
def verify():
    current_user = session.get('current_user', None)
    if not current_user:
        abort(404, 'User not logged in or not found')
    return jsonify({
        'status': 'success',
        'message': 'User verified',
        'user': current_user
    })