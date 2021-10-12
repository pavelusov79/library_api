import graphene
from graphene_django import DjangoObjectType

from authors.models import Author, Book, Article, Biography


class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = '__all__'


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = '__all__'


class ArticleType(DjangoObjectType):
    class Meta:
        model = Article
        fields = '__all__'


class BiographyType(DjangoObjectType):
    class Meta:
        model = Biography
        fields = '__all__'


class Query(graphene.ObjectType):
    all_authors = graphene.List(AuthorType)
    all_books = graphene.List(BookType)
    author_by_first_name = graphene.Field(AuthorType, first_name=graphene.String(required=True))
    books_by_author_name = graphene.List(BookType, name=graphene.String(required=False))

    def resolve_all_authors(self, info):
        return Author.objects.all()

    def resolve_all_books(self, info):
        return Book.objects.all()

    def resolve_author_by_first_name(self, info, first_name):
        return Author.objects.get(first_name=first_name)
    
    def resolve_books_by_author_name(self, info, name=None):
        books = Book.objects.all()
        if name:
            books = Book.objects.filter(authors__first_name=name)
        return books


schema = graphene.Schema(query=Query)
