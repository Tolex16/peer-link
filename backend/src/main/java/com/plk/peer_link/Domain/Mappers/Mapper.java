package com.plk.peer_link.Domain.Mappers;

public interface Mapper<A,B>{
    B mapTo(A a);

    A mapFrom(B b);

    Iterable<B> mapListTo(Iterable<A> a);




}
