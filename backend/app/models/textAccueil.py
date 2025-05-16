from app.models.models import db

class TextAccueil(db.Model):
    __tablename__ = 'text_accueil'

    id = db.Column(db.Integer, primary_key=True)

    # Header
    header_title = db.Column(db.String(255))
    header_description = db.Column(db.Text)
    button_activities = db.Column(db.String(255))
    button_contact = db.Column(db.String(255))
    button_instagram = db.Column(db.String(255))

    # Nos Activités
    activites_title = db.Column(db.String(255))
    activites_description = db.Column(db.Text)
    activites_button = db.Column(db.String(255))

    # Nos Partenaires
    partenaires_title = db.Column(db.String(255))

    # Nos Valeurs
    valeurs_title = db.Column(db.String(255))
    valeurs_description = db.Column(db.Text)

    valeur1_title = db.Column(db.String(255))
    valeur1_text = db.Column(db.Text)

    valeur2_title = db.Column(db.String(255))
    valeur2_text = db.Column(db.Text)

    valeur3_title = db.Column(db.String(255))
    valeur3_text = db.Column(db.Text)

    # Notre équipe
    equipe_section_title = db.Column(db.String(255))
    equipe_title = db.Column(db.String(255))
    equipe_description = db.Column(db.Text)
    equipe_button = db.Column(db.String(255))

    # Qui sommes-nous ?
    qui_section_title = db.Column(db.String(255))
    qui_title = db.Column(db.String(255))
    qui_description = db.Column(db.Text)

    # Nous contacter
    contact_title = db.Column(db.String(255))
    contact_description = db.Column(db.Text)
    contact_form_email = db.Column(db.String(255))
    contact_form_entreprise = db.Column(db.String(255))
    contact_form_message = db.Column(db.String(255))
    contact_form_objet = db.Column(db.String(255))
    contact_form_submit = db.Column(db.String(255))
    contact_reseaux = db.Column(db.String(255))

    # Transition
    transition_title = db.Column(db.String(255))

    def __repr__(self):
        return f"<TextAccueil {self.id}>"


    @staticmethod
    def insert_default_content():
        if not TextAccueil.query.first():  # Vérifie si la table est vide
            default = TextAccueil(
                # Header
                header_title="UQAC en Plein Air",
                header_description="Notre association a pour mission de faire découvrir le Saguenay, en mettant à l’honneur le Mont Valin, la Station Édouard et les nombreuses activités sportives à Chicoutimi.",
                button_activities="Nos activités",
                button_contact="Avez-vous des questions ? Contactez-nous !",
                button_instagram="Notre Instagram",

                # Nos Activités
                activites_title="Nos activités",
                activites_description="Notre association te propose une multitude d’activités en plein air...",
                activites_button="Voir toutes nos activités",

                # Nos Partenaires
                partenaires_title="Ils nous font confiance",

                # Nos Valeurs
                valeurs_title="Nos valeurs",
                valeurs_description="Notre association fonctionne sans but lucratif : chaque dollar récolté est entièrement réinvesti dans le projet pour offrir aux étudiants des expériences. Créée par des étudiants, pour des étudiants, elle a pour objectif de rendre l’aventure accessible à tous.",

                valeur1_title="Découverte du Saguenay : Un Terrain d’Aventure Sans Limites",
                valeur1_text="Le Saguenay est bien plus qu’une région : c’est un terrain de jeu grandeur nature pour tous les passionnés d’aventure. Notre association s’engage à faire découvrir ses paysages spectaculaires, ses sentiers méconnus et ses sites naturels d’exception. Que ce soit à travers des randonnées, des sorties en raquettes ou des excursions en canot, nous voulons ouvrir les portes de la nature à tous ceux qui cherchent à s’évader et à repousser leurs limites.",

                valeur2_title="Des Sommets à Explorer",
                valeur2_text="Le Mont Valin et la Station Édouard sont des joyaux du Saguenay que nous avons à cœur de promouvoir. Véritables paradis pour les amateurs de glisse, ces lieux offrent des pistes de ski, des sentiers de raquettes et des panoramas à couper le souffle. Notre mission est de faire connaître ces sites incontournables à travers des sorties, des événements et des activités qui rassemblent les amoureux de la montagne. Que tu sois un skieur aguerri ou un aventurier en quête de nouveaux défis, ces sommets n’attendent que toi pour révéler toute leur magie.",

                valeur3_title="Sport et Aventure à Chicoutimi",
                valeur3_text="Chicoutimi est un carrefour d’activités sportives et un point de départ idéal pour les amateurs de plein air. Au-delà des montagnes et des sentiers, notre association met en avant la diversité des sports et des aventures accessibles en ville et aux alentours. Vélo, escalade, kayak, trail... il y a mille et une façons de se dépasser tout en profitant de la nature. Nous voulons créer une communauté dynamique, où chacun trouve sa place et découvre de nouvelles passions.",

                # Notre équipe
                equipe_section_title="QUI SOMMES NOUS ?",
                equipe_title="Notre équipe",
                equipe_description="Notre association a pour mission de faire découvrir le Saguenay, en mettant à l’honneur le Mont Valin, la Station Édouard et les nombreuses activités sportives à Chicoutimi. Passionnés de plein air, nous voulons rendre l’aventure accessible à tous, à travers la randonnée, le ski, le camping et bien plus encore. Ici, chacun peut se dépasser, explorer et partager des moments uniques dans une nature grandiose. Rejoins-nous pour vivre des expériences inoubliables et repousser tes limites ! 🌲🏕⛷🚴‍♂️",
                equipe_button="En savoir +",

                # Qui sommes-nous
                qui_section_title="QUI SOMMES-NOUS ?",
                qui_title="Tout comprendre sur l'asso",
                qui_description="Notre association, créée par des étudiants et pour des étudiants, a pour mission de faire découvrir le Saguenay, de promouvoir les activités en plein air et de rassembler une communauté autour de l’aventure et du dépassement de soi. À travers des sorties, des événements et des initiations sportives, nous mettons tout en œuvre pour rendre la nature et le sport accessibles à tous, sans but lucratif. Mais plutôt que de longs discours, nous vous invitons à découvrir notre univers à travers cette vidéo 🎥. Apprenez-en plus sur notre projet, nos valeurs et comment nous pouvons collaborer ensemble pour faire grandir cette belle aventure. 👉 Regardez la vidéo et rejoignez-nous dans cette aventure !",

                # Nous contacter
                contact_title="Nous contacter",
                contact_description="N’hésite pas à nous contacter ! Que ce soit pour en savoir plus sur nos activités, proposer une collaboration ou rejoindre l’aventure, nous serons ravis de te répondre. Remplis le formulaire ci-dessous et nous reviendrons vers toi dès que possible.",
                contact_form_email="Email",
                contact_form_entreprise="Nom de l'entreprise",
                contact_form_message="Message",
                contact_form_objet="Objet",
                contact_form_submit="Envoyer",
                contact_reseaux="Réseaux sociaux",

                # Transition
                transition_title="Pourquoi ne pas nous rejoindre ?"
            )

            db.session.add(default)
            db.session.commit()
            print("✅ Texte d’accueil inséré avec succès.")
        else:
            print("ℹ️ Données déjà présentes, insertion ignorée.")
