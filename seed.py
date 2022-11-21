from datetime import date
from app import app, db

employers = [
    {
        'username': 'Cash App',
    },
    {
        'username': 'TDB',
    },
    {
        'username': 'Spiral',
    },
    {
        'username': 'Square',
    },
    {
        'username': 'Tidal',
    }
]

jobs = [
    
]




with app.app_context():
    db.drop_all()
    db.create_all()
    for user_toot in user_toots:
        user = User(username=user_toot['username'], password_hash='')
        for t in user_toot['toots']:
            toot = Toot(text=t[0], platform=t[1], date=t[2])
            user.toots.append(toot)
        db.session.add(user)
    db.session.commit()